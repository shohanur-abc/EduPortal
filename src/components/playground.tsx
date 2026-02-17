'use client';
import { forwardRef, useRef, useState } from 'react';
import type { GroupImperativeHandle, Layout } from 'react-resizable-panels';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Badge } from './ui/badge';

export const Playground = ({
	Preview,
}: {
	Preview?: React.ReactNode;
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(0);
	const groupRef = useRef<GroupImperativeHandle | null>(null);


	return (
		<section className="relative">
			<div className="sticky top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-2.5 bg-background/95 backdrop-blur-sm border-b gap-2">
				<div />
				<BreakPoints
					containerWidth={containerWidth}
					groupRef={groupRef}
					containerRef={containerRef}
				/>
			</div>

			<Container
				ref={containerRef}
				groupRef={groupRef}
				setContainerWidth={setContainerWidth}
			>
				{Preview}
				{/* <Comp /> */}
			</Container>
		</section>
	);
};


type ContainerProps = {
	groupRef: React.RefObject<GroupImperativeHandle | null>;
	setContainerWidth: (width: number) => void;
	children: React.ReactNode;
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(
	({ groupRef, setContainerWidth, children }, ref) => {
		const [side, setSide] = useState<'left' | 'right'>('left');

		const handleLayoutChange = (layout: Layout) => {
			let actSide = side === 'left' ? layout.left : layout.right;
			actSide = actSide > 50 ? 100 - actSide : actSide;
			groupRef.current?.setLayout({
				left: actSide,
				center: 100 - actSide * 2,
				right: actSide,
			});
		};

		return (
			<main
				ref={ref}
				className="overflow-x-auto **:data-[slot=resizable-handle]:w-0 **:data-[slot=resizable-handle]:outline-1"
			>
				<ResizablePanelGroup
					groupRef={groupRef}
					onLayoutChange={handleLayoutChange}
					defaultLayout={{ left: 0, center: 100, right: 0 }}
				>
					<ResizablePanel id="left" />
					<ResizableHandle withHandle onPointerDown={() => setSide('left')} />
					<ResizablePanel
						id="center"
						onResize={(w) => {setContainerWidth(w.inPixels / 16);}}>
						{children}
					</ResizablePanel>
					<ResizableHandle withHandle onPointerDown={() => setSide('right')} />
					<ResizablePanel id="right" />
				</ResizablePanelGroup>
			</main>
		);
	},
);

Container.displayName = 'Container';

const BreakPoints = ({
	containerWidth,
	groupRef,
	containerRef,
}: {
	containerWidth: number;
	groupRef: React.RefObject<GroupImperativeHandle | null>;
	containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
	const onBpClick = (width: number) => {
		const fullWidth = containerRef.current?.offsetWidth ?? 0;
		if (!fullWidth) return;
		console.log({ fullWidth });
		const center = (width / (fullWidth / 16)) * 100;
		const side = (100 - center) / 2;
		console.log({ set: width * 16 });
		groupRef.current?.setLayout({ left: side, center: center, right: side });
	};
	return (
		<div className="*:data-size:cursor-pointer *:data-[size=sm]:bg-muted *:data-[size=3xl]:bg-muted *:data-[size=7xl]:bg-muted">
			{(
				[
					['3xs', 16],
					['2xs', 18],
					['xs', 20],
					['sm', 24],
					['md', 28],
					['lg', 32],
					['xl', 36],
					['2xl', 42],
					['3xl', 48],
					['4xl', 56],
					['5xl', 64],
					['6xl', 72],
					['7xl', 80],
				] as [string, number][]
			).map(([sz, val], i, arr) => (
				<Badge
					key={sz}
					variant={
						containerWidth >= val &&
						containerWidth < (arr[i + 1]?.[1] || Infinity)
							? 'destructive'
							: 'outline'
					}
					onClick={() => onBpClick(val)}
					data-size={sz}
				>
					{sz}
				</Badge>
			))}
			<Badge
				className="border-2 ml-2 border-sky-900 shadow-accent"
				variant="outline"
			>
				{Math.floor(containerWidth)}rem
			</Badge>
		</div>
	);
};

