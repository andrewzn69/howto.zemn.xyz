'use client';
import React, { useState, useEffect, useRef } from 'react';

const eye = [
	"                        ...',;;:cccccccc:;,..",
	"                    ..,;:cccc::::ccccclloooolc;'.",
	"                 .',;:::;;;;:loodxk0kkxxkxxdocccc;;'..",
	'               .,;;;,,;:coxldKNWWWMMMMWNNWWNNKkdolcccc:,. ',
	"            .',;;,',;lxo:..                OXNNNX0koc:coo;.",
	"         ..,;:;,,,:ldl'                     .':d0XWWN0d:;lkd,",
	"       ..,;;,,'':loc.                         ..';lx00X0l,cxo,.",
	"     ..''....'cooc.                                ,ddx00occl:.",
	"   ..'..  .':odc.                                  .cxxxkkdl:,..",
	" ..''..   ;dxolc;'                               .;looolllol:'..",
	"..'..    .':lloolc:,..                      ..':clc:::;,,;:;,'..",
	"......   ....',;;;:ccc::;;,''',:loddol:,,;:clllolc:;;,'........",
	"    .     ....'''',,,;;:cccccclllloooollllccc:c:::;,'..",
	"            .......'',,,,,,,,;;::::ccccc::::;;;,,''...",
	"              ...............''',,,;;;,,''''''......`",
];

const iris = [
	' .dXWMMMMMMMMNklo',
	'.kWMMMWXXNWMMMMXd.',
	'lKMMMNl. .c0KNWNK:',
	'c0NMMX;   .l0XWN0;',
	'.x0KKKkolcld000xc.',
	' .lxx000kkxx00kc. ',
	"   'lxkkkkk0kd,   ",
];

// eye and region parameters
const EYE_CENTER = { line: 7, col: 34 };
const IRIS_RADIUS = { line: 4, col: 10 };
const IRIS_HEIGHT = iris.length;
const IRIS_WIDTH = iris[0].length;
const IRIS_MOVE_RADIUS = 3;

function isInEllipse(
	i: number,
	j: number,
	center: { line: number; col: number },
	radius: { line: number; col: number }
) {
	const normLine = (i - center.line) / radius.line;
	const normCol = (j - center.col) / radius.col;
	return normLine * normLine + normCol * normCol <= 1;
}

export default function Eye() {
	const [irisCenter, setIrisCenter] = useState(EYE_CENTER);
	const eyeRef = useRef<HTMLPreElement>(null);

	useEffect(() => {
		function handleMouseMove(e: MouseEvent) {
			if (!eyeRef.current) {
				return;
			}
			const rect = eyeRef.current.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width;
			let y = (e.clientY - rect.top) / rect.height;
			const verticalBias = 1;
			y = 0.5 + (y - 0.5) / 3;
			const col = Math.round(EYE_CENTER.col + (x - 0.5) * 2 * IRIS_MOVE_RADIUS);
			const line = Math.round(EYE_CENTER.line + (y - 0.5) * 2 * IRIS_MOVE_RADIUS + verticalBias);
			setIrisCenter({
				col: Math.max(
					EYE_CENTER.col - IRIS_MOVE_RADIUS,
					Math.min(EYE_CENTER.col + IRIS_MOVE_RADIUS, col)
				),
				line: Math.max(
					EYE_CENTER.line - IRIS_MOVE_RADIUS,
					Math.min(EYE_CENTER.line + IRIS_MOVE_RADIUS, line)
				),
			});
		}
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return (
		<div className="flex items-center justify-center pt-24 pb-16">
			<pre ref={eyeRef} className="leading-none text-fg text-sm font-mono">
				{eye.map((line, i) => (
					<div key={`eye-line-${i}-${line.slice(0, 10)}`} className='whitespace-pre'>
						{line.split('').map((char, j) => {
							// only render iris if base is whitespace, within iris bounds and within ellipse
							const IRIS_TOP = irisCenter.line - Math.floor(IRIS_HEIGHT / 2);
							const IRIS_LEFT = irisCenter.col - Math.floor(IRIS_WIDTH / 2);
							const irisLine = i - IRIS_TOP;
							const irisCol = j - IRIS_LEFT;
							if (
								char === ' ' &&
								irisLine >= 0 &&
								irisLine < IRIS_HEIGHT &&
								irisCol >= 0 &&
								irisCol < IRIS_WIDTH &&
								isInEllipse(i, j, irisCenter, IRIS_RADIUS)
							) {
								const irisChar = iris[irisLine][irisCol];
								if (irisChar !== ' ') {
									return (
										<span key={`iris-${i}-${j}-${irisChar}`} className="text-green">
											{irisChar}
										</span>
									);
								}
							}
							// otherwise, render the base eye
							return <span key={`char-${i}-${j}-${char}`}>{char}</span>;
						})}
					</div>
				))}
			</pre>
		</div>
	);
}
