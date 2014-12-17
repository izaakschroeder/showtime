# showtime

Put on a jolly good show.

## Setup

Installation is a little complex due to the use of the PRU.

```sh
# Load the PRUSS module at startup
echo "uio_pruss" > /etc/modules-load.d/uio_pruss.conf
# Enable the PRUSS in the device-tree at startup
echo "BB-BONE-PRU-01" > /boot/uboot/uEnv.txt
# Install dependencies
npm install
# Configure environment
vim .env
# Startup at boot
foreman export systemd
```

|----------|--------------------------------------|
| Variable | Description                          |
|----------|--------------------------------------|
| PORT     | Port to run server on                |
|----------|--------------------------------------|

## FAQ

### Lights are totally off

 * Wires plugged in the wrong way
 * Power not connected
 * No signal

### One light near the start is on dimly

 * Ground not connected

### Lights flickering randomly

 * Noisy data line
