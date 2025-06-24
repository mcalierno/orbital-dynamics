from models.orbital_dynamics_ode import *
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
      

      # Fr       : radial thrust (perpendicular to orbit)
      # Ftheta   : horizontal thrust (parralel to orbit)
      # t_thrust : duration of thrust
      # z0       : initial distance from target in vertical direction (m)
      # v_z0     : initial velocity in z direction
      # phi0_m   : initial distance from target in horizontal direction (m)
      # v_phi0   : inital velocity in phi direction
      # dt       : integration time step
      def set_params(self, Fr, Ftheta, t_thrust, z0=-1000, phi0_m=-2000, dt=0.1):
        self.F_r = Fr
        self.F_theta = Ftheta
        self.t_thrust = t_thrust
        
        z0 = z0
        v_z0 = 0
        phi0 = phi0_m/self.r_0  # Using cosine small angle approximation
        v_phi0 = math.sqrt(self.G*self.M_E/(self.r_0+z0)**3)-self.omega_0
        t0 = 0
        
        self.reset([z0,v_z0,phi0,v_phi0], dt, t0)

          
      # Determine min distance to target
      def min_dist_to_target(self):
        return(self.min_min())
      
    
      # Plot the trajectory of the spacecraft for single spacecraft model
      def plot(self, i, j):
        if (j == 0):
            lx = self.t_list
        else:
            lx = [v[j-1] for v in self.V_list]
        if (i == 0):
            ly = self.t_list
        else:
            ly = [v[i-1] for v in self.V_list]

        # Ensure all elements are floats (optional, but safe)
        lx = np.array(lx, dtype=float)
        ly = np.array(ly, dtype=float)

        fig, ax = plt.subplots()
        fig.patch.set_facecolor('black')      # Set figure background to black
        ax.set_facecolor('black')             # Set axes background to black
        line, = ax.plot([], [], 'b-')
        ax.set_xlim(lx.min(), lx.max())
        ax.set_ylim(ly.min(), ly.max())
        print(lx.min(), lx.max())
        
        def init():
            line.set_data([], [])
            return line,

        def update(frame):
            line.set_data(lx[:frame*300], ly[:frame*300])
            return line,

        duration_sec = 0.1  # desired duration in seconds
        n_frames = len(lx)
        interval = (duration_sec * 1000) / n_frames  # ms per frame

        ani = FuncAnimation(fig, update, frames=floor(n_frames/300), init_func=init, blit=True, interval=1)
        return ani
    


if __name__=="__main__":
    dt = 0.1
    gdt = 1
    s = Spacecraft([0,0,0,0], dt, 0, 4e5, 4000.) # initial condition set later
    tmax= 4000
        
    # Output min distance and time it occurred, plot the trajectory in the colour set by 'style' 
    def run(style, Fr, Ftheta, t_thrust):
        tmin, dmin = s.min_dist_to_target(Fr,Ftheta,t_thrust,tmax,dt,gdt)
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

    
