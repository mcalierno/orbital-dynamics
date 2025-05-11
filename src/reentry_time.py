import math
import numpy as np
import matplotlib.pyplot as plt
import scipy.optimize


### Calculate and plot the time until re-enty for objects
### of various masses and altitudes (page 8)

# Define our constants 
G     = 6.673e-11
M_E   = 5.97e24
R_E   = 6370000
B     = 4.63e30
sigma = 7.57
rho   = 2700000
m     = 0.0027
A     = 0.01**2
seconds_in_year = 60*60*24*365

def time_until_reentry(h, rho):
    t = rho *(h**(sigma+1)/(sigma+1)) / (4*B * np.sqrt(G*M_E*R_E))
    return (t/seconds_in_year)

# Calculate the re-entry times for objects on page 9
x = np.linspace(300000, 1000000, num=1000)
t_cube = time_until_reentry(x, 27)
t_rod = time_until_reentry(x, 50)
t_sq_plate = time_until_reentry(x, 5.4)
t_gemini = time_until_reentry(x, 3850/(math.pi*1.5**2))

# Plot how time of re-entry varies with altitude for each object
plt.xlabel('h / km',fontsize=18)
plt.ylabel('t / years',fontsize=18)

plt.semilogy(x/1000, t_cube, color='black', label ='Cube')
plt.semilogy(x/1000, t_rod, 'g-', label='Rod')
plt.semilogy(x/1000, t_sq_plate, 'b-', label='Square Plate')
plt.semilogy(x/1000, t_gemini, 'r-', label='Gemini')

plt.legend(loc="upper left")
plt.ticklabel_format(style='sci', axis='x', scilimits=(0,0))
# plt.savefig("fig.pdf")
plt.show()

r_0 = 400000
x = (r_0-1000)/r_0 + 1
y = 1/(2*np.sqrt(2))
#print (math.pi(1-y*np.sqrt(x**3)))