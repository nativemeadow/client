import React, { Suspense } from 'react';
import { useImage } from 'react-image';

import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';

type image_data = { src: string[]; alt: string };
function ImageComponent(props: image_data) {
	const { src } = useImage({
		srcList: props.src,
	});

	return <img src={src} alt={props.alt} />;
}

export default function Image(props: image_data) {
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<ImageComponent {...props} />
		</Suspense>
	);
}
