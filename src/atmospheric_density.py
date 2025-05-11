import math
import numpy as np
import matplotlib.pyplot as plt
import scipy.optimize


### Fit and plot the atmospheric density data (src/data/AthmDensity.csv) to
### our density function (eq. 25, page 5)


# Compute the density function
def f_density(h, a, l, sigma):
    B = 8.82e7
    h_0 = 1
    rho = a*np.exp(-h*l) + B*(h/h_0)**(-sigma)
    return(rho)

# Compute the logarithm of the density function
def log_f_density(h, a, l, sigma):
    B = 8.82e7
    h_0 = 1
    log_rho = np.log((a*np.exp(-h*l) + B*(h/h_0)**(-sigma)))
    return(log_rho)



data = np.genfromtxt("src/data/AthmDensity.csv", delimiter=",", skip_header=1)

# Separate data into array for height and array for density
H, D = map(np.array, zip(*data))

# Compute log of density data
log_D = np.log(D)

# Fit the log of the density data to the log of the function for improved accuracy
opt, cov = scipy.optimize.curve_fit(log_f_density, H, log_D, p0=[0, 0.1, 0.1])

# Print the fitted values of our parameters
print('a =',opt[0], '\nl =', opt[1], '\nsigma =', opt[2])

plt.xlabel('h',fontsize=20)
plt.ylabel('dens',fontsize=20)

# Plot the data values of altitude and density
plt.semilogy(H, D, "b*", label='Data points')

# Plot the fitted curve
plt.semilogy(H, f_density(H, *opt), 'r-', label='Fitted curve')
plt.legend(loc="upper right")
plt.show()
