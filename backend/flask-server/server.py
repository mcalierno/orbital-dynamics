from flask import Flask, jsonify, request
from flask_cors import CORS
import sys
sys.path.insert(1, '/Users/Michael/Code/Projects/OrbitalDynamics/backend/models')
import run_spacecraft

app = Flask(__name__)
CORS(app)

@app.route('/run', methods=['GET'])
def test():
    x = run_spacecraft.run_server('b-', 32, 100, 266, 'F_r=32, t_thrust=266')
    response = jsonify(x)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/run_server', methods=['GET','POST'])
def run_server():
    data = request.get_json()
    x = run_spacecraft.run_server('b-', float(data.get("F_r")), float(data.get("F_theta")), float(data.get("t_thrust")), 'F_r=32, t_thrust=266')
    response = jsonify(x)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(port=6950, debug=True)
