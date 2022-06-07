import React, { Suspense } from 'react';
import { useImage } from 'react-image';
//import useImage from '../../../shared/hooks/use-image';

import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';

type image_data = {
	src: string[];
	alt: string;
	cssClass?: string;
	onClick?: () => {};
};
function ImageComponent(props: image_data) {
	const { src } = useImage({
		srcList: props.src,
	});

	return (
		<img
			src={src}
			alt={props.alt}
			className={props.cssClass}
			onClick={props.onClick}
		/>
	);
}

export default function Image(props: image_data) {
	// console.log('Image props:', props);
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<ImageComponent {...props} />
		</Suspense>
	);
}
