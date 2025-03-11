import React from 'react';

// Removed all project functionality; now returns a blank black page.
const Projects = React.forwardRef<HTMLDivElement>((props, ref) => {
	return <div ref={ref} className="h-screen w-full bg-black"></div>;
});

export default Projects;