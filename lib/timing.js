


function Timing() {

}

Timing.cubicBezier = function(p0,p1,p2,p3) {
	return function(t) {
		if (typeof t !== 'number') throw new TypeError();
		return p0 * Math.pow( 1 - t, 3 ) +
		p1 * 3 * t * Math.pow( 1 - t, 2 ) +
		p2 * 3 * Math.pow(t,2) * ( 1 - t ) +
		p3 * Math.pow(t,3);
	}
}

Timing.steps = function(a) {

	return function(t) {
		return Math.floor(t*a)/a;
	}
}

Timing.normalize = function(input) {
	var result = input.match(/(\d+)(us|ms|s)/);
	return result ? parseInt(result[1],10) * ({ s: 10000000, ms: 10000, us: 1 })[result[2]] : 0;
}

Timing.builtin = {
	'none': Timing.steps(2),
	'linear': Timing.cubicBezier(0,0,1,1),
	'ease': Timing.cubicBezier(0.25,0.1,0.25,1),
	'ease-in': Timing.cubicBezier(0.42,0,1,1),
	'ease-out': Timing.cubicBezier(0,0,0.58,1),
	'ease-in-out': Timing.cubicBezier(0.42,0,0.58,1),
	'parabolic-rise':Timing.cubicBezier(1/3, 2/3, 2/3, 1),
	'parabolic-fall': Timing.cubicBezier(1/3, 0, 2/3, 1)
}



var contexts = [ ];
function work(){
	var now = Date.now();
	contexts = contexts.filter(function(context) {
		var animation = context.animation,
		elapsed = (now - context.start) || 0,
		completed = animation.duration === 0 ? 1 : animation.timingFunction(elapsed/animation.duration),
		last = context.current === animation.at.length - 1,
		from = animation.at[context.current],
		to = animation.at[last ? context.current : context.current+1],
		z = last ? 1 : (completed - from.time) / (to.time - from.time),
		x = 1 - z;

		//console.log('current: '+context.current+'; completed: '+completed+'; z: '+z );

		//Calculate new pixel values
		for (var idx = 0, j = 0; j < animation.ranges.length; ++j) {
			for (var k = animation.ranges[j].start; k <= animation.ranges[j].end; ++k) {
				var f = from.data(idx,completed),
				t = to.data(idx, completed),
				r = clamp(f.r*x+t.r*z),
				g = clamp(f.g*x+t.g*z),
				b = clamp(f.b*x+t.b*z),
				a = clamp(f.a*x+t.a*z);
				setPixel(k, r, g, b, a);
				++idx;

			}
		}

		if (z >= 1 && !last)
			++context.current;

			//Calculate next animation data if repeating
			if (elapsed > animation.duration) {
				context.start = Date.now();
				context.current = 0;
				if (animation.direction === 'alternate')
					context.forward = !context.forward;
					return !context.repeat === 'none' && (context.repeat === 'infinite' || (--context.repeat > 0));
				}

				return true;
			});
			setImmediate(work);
		}
		work();

		function handle() {

		}

		var colors = [
	{r: 0xFF, g: 0x00, b: 0x00},
{r: 0x00, g: 0xFF, b: 0x00},
{r: 0x00, g: 0x00, b: 0xFF},
];

function sherp(x) {
	return function foo(i, e) {
		return colors[(x+i)%colors.length];
	}
}

function none() {
	return {r:0,g:0,b:0,a:0}
}

function bar(i, e) {
	return colors[(i+1)%colors.length];
}

/*

{ time: 0, data: { r: 0, g: 0xFF, b: 0, a: 0xFF } },
{ time: 0.25, data: { r: 0xFF, g: 0, b: 0, a: 0xFF } },
{ time: 0.5, data: { r: 0, g: 0, b:0xFF, a: 0xFF } },
{ time: 0.75, data: { r: 0xFF, g: 0xFF, b: 0, a: 0xFF } },
{ time: 1, data: { r:0xFF, g: 0, b: 0xFF, a: 0xFF } }
*/


var l = 0;
setInterval(function() {
	++l;
	contexts.push({
		animation: {
			at: [
		{ time: 0, data: sherp(l+1) },
	{ time: 0.5, data: sherp(l) },
{ time: 1, data: sherp(l-1)  },
],
duration: 2000,
ranges: [ { start: 0, end: 49 } ],
timingFunction: Timing.builtin['linear'],
direction: 'alternate'
},
forward: true,
current: 0,
start: Date.now(),
repeat: 'none'
});
}, 2000)


function tween(to, easing) {
	return function(input, elapsed) {
		var f = input,
		t = to;
		return {
			r: f.r*x+t.r*z,
			g: f.g*x+t.g*z,
			b: f.b*x+t.b*z,
			a: f.a*x+t.a*z
		}
	}
}
