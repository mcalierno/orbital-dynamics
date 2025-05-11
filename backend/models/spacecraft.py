from orbital_dynamics_ode import *
import math
import numpy as np
import matplotlib.pyplot as plt


# A class to compute the trajectory of the spacecraft
class Spacecraft(OrbitalDynamicsODE):

      def __init__(self, V0=[0], dt=0.1, t0=0, h=0.0, m=1.0):
         OrbitalDynamicsODE.__init__(self, V0, dt, t0, h)
         self.m = m # When F is non null the mass plays a role
         
      # Solve the system of equations, setting F_r, F_theta to 0 after t=t_thrust (thrusters stop firing)
      def F(self, t, v):
          if t > self.t_thrust:
              self.F_r = 0
              self.F_theta = 0
          
          return super().F(t, v)

          
      # Integrate equation and determine min distance to target
      #     Fr       : radial thrust (perpendicular to orbit)
      #     Ftheta   : horizontal thrust (parralet to orbit)
      #     t_thrust : duration of thrust
      #     tmax     : duration of integration
      #     dt       : integration time step
      def min_dist_to_target(self,Fr,Ftheta,t_thrust,tmax,dt,gdt=1):
        self.F_r = Fr
        self.F_theta = Ftheta
        self.t_thrust = t_thrust
        
        # Set our intial conditions
        z0 = -1000
        v_z0 = 0
        phi0 = -2000/self.r_0
        v_phi0 = math.sqrt(self.G*self.M_E/(self.r_0+z0)**3)-self.omega_0
        t0 = 0
        self.reset([z0,v_z0,phi0,v_phi0],dt,t0)
        
        self.iterate(tmax)
        
        return(self.min_min())
    

if __name__=="__main__":
    dt = 0.1
    gdt = 1
    s = Spacecraft([0,0,0,0], dt, 0, 4e5, 4000.) # initial condition set later
    tmax= 4000
        
    # Output min distance and time it occurred, plot the trajectory in the colour set by 'style' 
    def run(style, Fr, Ftheta, t_thrust):
        tmin,dmin = s.min_dist_to_target(Fr,Ftheta,t_thrust,tmax,dt,gdt)
        print("Fr={} Ftheta={} t_thrust={}".format(Fr,Ftheta,t_thrust))
        print("dmin={}, tmin={} Fuel={}"\
            .format(dmin,tmin,(abs(Fr)+abs(Ftheta))*t_thrust))
        s.plot(1,3, style)
            
    Fr = 50
    Ftheta = 100.
    t_thrust = 100
    run('b-', Fr, Ftheta, t_thrust)
    
    Fr = 25
    Ftheta = 50
    t_thrust = 200
    run('g-', Fr, Ftheta, t_thrust)
    
    Fr = 10
    Ftheta = 20.
    t_thrust = 500
    run('r-', Fr, Ftheta, t_thrust)
    
    plt.xlabel('phi',fontsize=20)
    plt.ylabel('z',fontsize=20)
    plt.plot([0],[0],'r+')
    plt.show()

    
