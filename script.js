let animationId = null;
let t = 0;

function plotFunction() {
  const input = document.getElementById('functionInput').value;
  if (animationId) cancelAnimationFrame(animationId);
  try {
    const expr = math.parse(input);
    const compiled = expr.compile();

    const usesX = input.includes('x');
    const usesY = input.includes('y');
    const usesT = input.includes('t');

    const constantScope = {
      pi: math.pi,
      e: math.e,
      i: math.complex(0, 1)
    };

    const getLayout = (input, tVal) => ({
      title: {
        text: `z = ${input}${usesT ? `, t=${tVal.toFixed(2)}` : ''}`,
        font: { color: '#ffffff', size: 16 }
      },
      paper_bgcolor: '#000000',
      plot_bgcolor: '#000000',
      scene: {
        aspectmode: 'cube',
        xaxis: { title: 'x', color: 'white', gridcolor: '#222', zerolinecolor: '#333' },
        yaxis: { title: 'y', color: 'white', gridcolor: '#222', zerolinecolor: '#333' },
        zaxis: { title: 'z', color: 'white', gridcolor: '#222', zerolinecolor: '#333' },
        camera: { eye: { x: 1.5, y: 1.5, z: 1.5 } }
      }
    });

    const generateGridData = (tVal) => {
      const xVals = math.range(-10, 10, 0.5).toArray();
      const yVals = math.range(-10, 10, 0.5).toArray();
      const zVals = [];

      for (let i = 0; i < yVals.length; i++) {
        const row = [];
        for (let j = 0; j < xVals.length; j++) {
          const scope = { ...constantScope, x: xVals[j], y: yVals[i], t: tVal };
          try {
            let result = compiled.evaluate(scope);
            if (math.typeOf(result) === 'Complex') result = result.re;
            row.push(result);
          } catch {
            row.push(NaN);
          }
        }
        zVals.push(row);
      }

      return { x: xVals, y: yVals, z: zVals };
    };

    const drawPlot = (tVal) => {
      const { x, y, z } = generateGridData(tVal);
      const surface = {
        type: 'surface',
        x: x,
        y: y,
        z: z,
        colorscale: 'Viridis'
      };
      Plotly.react('plot', [surface], getLayout(input, tVal));
    };

    function animate() {
      drawPlot(t);
      t += 0.05;
      animationId = requestAnimationFrame(animate);
    }

    if (usesT) {
      t = 0;
      animate();
    } else {
      drawPlot(0);
    }

  } catch (err) {
    alert("Invalid function. Check syntax.");
    console.error(err);
  }
}
