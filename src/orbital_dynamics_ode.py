from ode_rk4 import *
import math


# A class to solve the system of 4 differential equations (eq. 47, page 9)
class OrbitalDynamicsODE(ODE_RK4):
  
    # V0 : initial conditions for z, v_z, phi, v_phi.
    # dt : integration time step
    # t0 : initial time
    # h  : altitude of the target orbit
    def __init__(self, V0=[0], dt=0.1, t0=0, h=0.0):
        super().__init__(V0, dt, t0)
        self.h   = h
        self.G   = 6.673e-11
        self.M_E = 5.97e24
        self.R_E = 6370e3
        self.r_0 = self.R_E+h
        self.omega_0 = math.sqrt(self.G*self.M_E/self.r_0**3)
        self.F_r     = 0
        self.F_theta = 0
        self.m       = 1
        self.t_last  = 0
        self.d_last  = -1
        self.d_butlast = -1
        self.d_min = []
        self.d_max = []

    
    # Reset the integration parameters; see __init__ for more info
    def reset(self, V0, dt, t0=0):
        super().reset(V0, dt, t0)
        self.t_last = 0
        self.d_last = -1
        self.d_butlast = -1
        self.d_min = []
        self.d_max = []
    
    
    # Solve the system of equations:
    #   g_z = dz/dt
    #   g_phi = dphi/dt
    #   dg_z/dt = -(G * M_E) / (r_0 + z)**2 + (r_0 + z)*(omega_0 + g_phi)**2 + F_r/m
    #   dg_phi/dt = (-2 * (omega_0 + g_phi) * g_z)/(r_0 + z) + F_theta / (m*(r_0 + z))
    # where:
    # v[0] is z
    # v[1] is dz/dt
    # v[2] is phi
    # v[3] is dphi/dt
    def F(self, t, v):
        z       = v[0]
        z_dot   = v[1]
        phi     = v[2]
        phi_dot = v[3]
        
        g_z       = z_dot
        g_phi     = phi_dot
        g_z_dot   = -(self.G * self.M_E) / (self.r_0 + z)**2 + (self.r_0 + z)*(self.omega_0 + g_phi)**2 + self.F_r/self.m
        g_phi_dot = (-2 * (self.omega_0 + g_phi) * g_z)/(self.r_0 + z) + self.F_theta / (self.m*(self.r_0 + z))
        
        return(np.array([g_z, g_z_dot, g_phi, g_phi_dot]))
        
    
    # Return the distance between the spacecraft and the reference trajectory
    def dist_2_reference(self):
        phi = self.V[2]
        z = self.V[0]

        d = np.sqrt(self.r_0**2 + (self.r_0+z)**2 - 2*self.r_0*(self.r_0 + z)*math.cos(phi))
        return (d)
    
    
    # Determine any local minima and add them with their corresponding time to a list
    def post_integration_step(self):
        # Calculate current distance
        d_curr = self.dist_2_reference()
        
        # Determine any local minima and if found, add with corresponding time to self.d_min
        if self.d_last <= d_curr and self.d_last < self.d_butlast:
            self.d_min.append([self.t_last, self.d_last])
        
        # Update our last distance and time
        self.d_butlast = self.d_last
        self.d_last = d_curr
        self.t_last = self.t
        
    # Returns the time and distance of the smallest local minimum ocurring after t_after
    def min_min(self, t_after=0):      

        # Create a new list containing only local minimums ocurring after t_after
        new_d_min = [i for i in self.d_min if i[0] > t_after]
        # If there are no valid local minimums, return 'n/a'
        if new_d_min == []:
            return['n/a', 'n/a']
        # Return the array with the lowest value of d
        glob_min = min(new_d_min, key=lambda x: x[1])
        return(glob_min)
      









