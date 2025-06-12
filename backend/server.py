from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from models import run_spacecraft
from models import spacecraft
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64

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
    # spacecraft = spacecraft.Spacecraft(V0 = [0,0,0,0],     # initial condition set later
    #                     dt = dt, 
    #                     t0 = 0,
    #                     h  = 4e5,
    #                     m  = 4000) 
    # do some validation checking here
    data = request.get_json()
    plt.clf() 
    x = []
    for index in data["rowValues"]:
        result = run_spacecraft.run_server('b-', float(index.get("F_r")), float(index.get("F_theta")), float(index.get("t_thrust")), 'F_r=32, t_thrust=266')
        x.append(result)

    # Save the plot to a BytesIO object
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    img_base64 = base64.b64encode(img.read()).decode('utf-8')
    
    response = jsonify({"results": x, "plot": img_base64})
    response.headers.add('Access-Control-Allow-Origin', '*')
    
    return response

if __name__ == '__main__':
    app.run(port=6950, debug=True)
