import math
import numpy as np
import matplotlib.pyplot as plt
from spacecraft import *

dt = 0.1
gdt = 1
tmax = 4000
labels=[]

# Set up the spacecraft object
spacecraft = Spacecraft(V0 = [0,0,0,0],     # initial condition set later
                        dt = dt, 
                        t0 = 0,
                        h  = 4e5,
                        m  = 4000) 


def run(style, Fr, Ftheta, t_thrust, label):
    tmin,dmin = spacecraft.min_dist_to_target(Fr, Ftheta, t_thrust, tmax, dt, gdt)
    
    print("Fr={} Ftheta={} t_thrust={}".format(Fr, Ftheta, t_thrust))
    print("dmin={}, tmin={} Fuel={}"\
        .format(dmin,tmin,(abs(Fr)+abs(Ftheta))*t_thrust))
    
    spacecraft.plot(1, 3, style)
    plt.ticklabel_format(style='sci', axis='x', scilimits=(0,0))
    labels.append(label)


def run_server(style, Fr, Ftheta, t_thrust, label):
    spacecraft = Spacecraft(V0 = [0,0,0,0],     # initial condition set later
                            dt = dt, 
                            t0 = 0,
                            h  = 4e5,
                            m  = 4000) 
    tmin,dmin = spacecraft.min_dist_to_target(Fr, Ftheta, t_thrust, tmax, dt, gdt)
    spacecraft.plot(1, 3, style)
    plt.ticklabel_format(style='sci', axis='x', scilimits=(0,0))

    return({"Fr":Fr, "Ftheta":Ftheta, "t_thrust":t_thrust, "dmin":dmin, "tmin":tmin, "Fuel":(abs(Fr)+abs(Ftheta))*t_thrust})
    

# Fr = 0
# Ftheta = 5
# t_thrust = 453.2
# run('b-', Fr, Ftheta, t_thrust, 'F_r=0, t_thrust=11.4')


# Fr = 32
# Ftheta = 100
# t_thrust = 266
# run('b-', Fr, Ftheta, t_thrust, 'F_r=32, t_thrust=266')

# Fr = 16
# Ftheta = 100
# t_thrust = 17
# run('orange', Fr, Ftheta, t_thrust, 'F_r=16, t_thrust=17')

# Fr = 25
# Ftheta = 100.
# t_thrust = 15
# run('black', Fr, Ftheta, t_thrust, 'F_r=25, t_thrust=15')

# Fr = 8
# Ftheta = 100
# t_thrust = 12
# run('g-', Fr, Ftheta, t_thrust, 'F_r=8, t_thrust=12')

# Fr = 0
# Ftheta = 100.
# t_thrust = 12.2
# run('r-', Fr, Ftheta, t_thrust, 'F_r=0, t_thrust=12.2')

# print(labels)

# plt.xlim(-3e-4, 1e-4)
# plt.ylim(-1000, 1500)
# plt.plot([0],[0],'r+')
# plt.legend(labels, loc="upper left")
# plt.xlabel('phi',fontsize=20)
# plt.ylabel('z',fontsize=20)
# plt.show()
