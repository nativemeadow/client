import React, { useEffect, useState } from 'react';
import useImage from '../../shared/hooks/use-image';
import configData from '../../config.json';

const theImage = [
	`${configData.IMAGES}/products/1-2-1RedLaPazPebbles.jpg`,
	`${configData.IMAGES}/products/3-4crushedDrainRock.jpg`,
];

const GetImagesFromServer = function GetImagesFromServer() {
	const { src, error } = useImage(theImage);

	return (
		<div>
			<img
				className='smartImage'
				src={src}
				alt={'test'}
				style={{ width: '500px' }}
			/>
		</div>
	);
};

export default GetImagesFromServer;
