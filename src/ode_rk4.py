from abc import ABC, abstractmethod
import matplotlib.pyplot as plt 
import numpy as np

# An abstract base class to compute the solution of differential equations 
# using the fourth order Runge-Kutta method.
class ODE_RK4(ABC):

    # V0 : initial value (as an array or a list) 
    # dt : integration time step
    # t0 : initial time
    def __init__(self, V0=[0], dt=0.1, t0=0):
        self.reset(V0, dt, t0)
        

    # Reset the integration parameters; see __init__ for more info    
    def reset(self, V0, dt, t0=0):
        self.V  = np.array(V0, dtype='float64')
        self.dt = dt
        self.t  = t0
        self.t_list = [] # to store f values for plots
        self.V_list = [] # to store t values for plots
    

    # Computes the right hand side of the equation dV/dt = F(t,V)
    @abstractmethod
    def F(self, t, V):
        pass
    

    # Perform a single integration step of the 4th order 
    # Runge Kutta method.
    def one_step(self):
        k1 = self.F(self.t, self.V)
        K = self.V+0.5*self.dt*k1

        k2 = self.F(self.t+0.5*self.dt, K)
        K = self.V+0.5*self.dt*k2

        k3 = self.F(self.t+0.5*self.dt, K)
        K = self.V+self.dt*k3
    
        k4 = self.F(self.t+self.dt, K)
        # self.v -> v(t+dt)
        self.V += self.dt/6.0*(k1+2.0*(k2+k3)+k4)
        # t -> t + dt
        self.t += self.dt

        self.post_integration_step()


    # Executed at the end of each integration step; used to track properties
    # of solution
    @abstractmethod
    def post_integration_step(self):
        pass
    

    # Solve the system of equations DN/dt = F(N) until t=tmax.
    # Save N and t in lists N_list and t_list every fig_dt.
    #   tmax   : integration upper bound
    #   fig_dt : interval between data point for figures (use dt if < 0)
    def iterate(self, tmax, fig_dt=-1):

        if(fig_dt < 0) : fig_dt = self.dt*0.99 # save all data
        
        next_fig_t = self.t*(1-1e-15) # ensure we save the initial values

        tmax -= self.dt*0.1
        while(self.t < tmax):
            self.one_step()
            if(self.t >= next_fig_t):      
                self.V_list.append(np.array(self.V))
                self.t_list.append(self.t)
                next_fig_t += fig_dt

        
    # Plot V[i] versus t    (i > 1 and j = 0)  using style
    # Plot V[i] versus V[j] (i > 1 and j > 1)  using style
    # Plot t    versus V[j] (i = 0 and j > 1)  using style
    #     i : index of function for abscissa 
    #     j : index of function for ordinate
    #     format : format for the plot function
    def plot(self, i, j=0, style="k-"):

        if(j==0):
            lx = self.t_list
        else: # extra item i-1 from each element of f_list
            lx = list(map (lambda v : v[j-1] , self.V_list))
        if(i==0):
            ly = self.t_list
        else:
            ly = list(map (lambda v : v[i-1] , self.V_list))
        plt.plot(lx, ly, style)




