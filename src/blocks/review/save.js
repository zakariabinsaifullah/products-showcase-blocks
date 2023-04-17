// import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { id, itemsOnVisible } = attributes;
	return (
		<div
			{...useBlockProps.save({
				className: id,
			})}
			data-items={itemsOnVisible}
		>
			<InnerBlocks.Content />
		</div>
	);
}
