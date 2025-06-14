from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from models import run_spacecraft
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64
import os
import tempfile
import matplotlib.animation as animation

app = Flask(__name__)
CORS(app)

@app.route('/run', methods=['GET'])
def test():
    x = run_spacecraft.run_server('b-', 32, 100, 266, 'F_r=32, t_thrust=266')
    response = jsonify(x)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/run_server', methods=['POST'])
def run_server():
    # do some validation checking here
    data = request.get_json()
    plt.clf() 
    results, ani = run_spacecraft.run_model(data["rowValues"])

    # Save the plot to a BytesIO object
    with tempfile.NamedTemporaryFile(delete=False, suffix=".gif") as temp_file:
        writer = animation.PillowWriter(fps=30, metadata=dict(artist="Me"), bitrate=1800)
        ani.save(temp_file.name, writer=writer)

        # Read the file contents into a BytesIO object
        temp_file.seek(0)
        buf = io.BytesIO(temp_file.read())
        gif = base64.b64encode(buf.getbuffer()).decode("ascii")  # return gif

    os.remove(temp_file.name)
    response = jsonify({"results": results, "plot": gif})
    response.headers.add('Access-Control-Allow-Origin', '*')
    
    return response

if __name__ == '__main__':
    app.run(port=6950, debug=True)
