Real-Time 3D Function Grapher
A web-based tool for visualizing 3D mathematical functions with optional time-based animations. Users can input expressions in terms of x, y, and optionally t to generate animated or static 3D plots.

Features
- Supports mathematical expressions with x, y, and t (for time-dependent functions)
- Uses math.js to parse and evaluate expressions, including support for constants like pi, e, and i
- Renders interactive 3D surface plots using Plotly.js
- Animates plots in real time when t is present in the expression

Constraints
Input must be a valid math.js expression; invalid syntax triggers an error
- Functions must return real values for plotting; complex outputs are coerced using the real component
- Domain for both x and y is fixed between -10 and 10 with a step size of 0.5
- Performance may degrade for highly complex functions or on low-end devices due to dense 3D rendering
