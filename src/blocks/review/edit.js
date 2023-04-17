import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	Card,
	CardHeader,
	CardBody,
	RangeControl,
} from '@wordpress/components';
const { Fragment } = wp.element;

// editor style
import './editor.scss';

// import child block
import './product.js';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		id,
		itemsOnVisible,
		separatorColor,
		subtitleColor,
		titleColor,
		readMoreBtnColor,
		readMoreBtnHoverColor,
		ctaColor,
		ctaBgColor,
		ctaHoverColor,
		ctaHoverBgColor,
	} = attributes;

	setAttributes({
		id: `prb-${clientId.slice(0, 8)}`,
	});

	const allStyles = `
	.${id} .wp-block-prb-product{
		border-bottom-color: ${separatorColor};
	}

	.${id} .prb-subtitle{
		color: ${subtitleColor};
	}

	.${id} .prb-title{
		color: ${titleColor};
	}

	.${id} .prb-btn{
		color: ${readMoreBtnColor};
	}

	.${id} .prb-btn:hover{
		color: ${readMoreBtnHoverColor};
	}

	.${id} .prb-cta{
		color: ${ctaColor};
		background-color: ${ctaBgColor};
	}

	.${id} .prb-cta:hover{
		color: ${ctaHoverColor};
		background-color: ${ctaHoverBgColor};
	}`;

	return (
		<Fragment>
			<style>{`${allStyles}`}</style>
			<InspectorControls>
				<Card>
					<CardHeader>
						<strong>
							{__(
								'Total Items Visibility',
								'product-review-blocks'
							)}
						</strong>
					</CardHeader>
					<CardBody>
						<RangeControl
							label={__(
								'Total Items visible on load',
								'product-review-blocks'
							)}
							value={itemsOnVisible}
							onChange={(value) =>
								setAttributes({ itemsOnVisible: value })
							}
							min={1}
							max={100}
						/>
					</CardBody>
				</Card>
				<PanelColorSettings
					title={__('Item Separator Color', 'product-review-blocks')}
					initialOpen={true}
					colorSettings={[
						{
							value: separatorColor,
							onChange: (value) =>
								setAttributes({ separatorColor: value }),
							label: __(
								'Separator Color',
								'product-review-blocks'
							),
						},
					]}
				/>
				<PanelColorSettings
					title={__('Product Info Colors', 'product-review-blocks')}
					initialOpen={true}
					colorSettings={[
						{
							value: subtitleColor,
							onChange: (value) =>
								setAttributes({ subtitleColor: value }),
							label: __(
								'Subtitle Color',
								'product-review-blocks'
							),
						},
						{
							value: titleColor,
							onChange: (value) =>
								setAttributes({ titleColor: value }),
							label: __('Title Color', 'product-review-blocks'),
						},
					]}
				/>
				<PanelColorSettings
					title={__('Read More Link Colors', 'product-review-blocks')}
					initialOpen={true}
					colorSettings={[
						{
							value: readMoreBtnColor,
							onChange: (value) =>
								setAttributes({ readMoreBtnColor: value }),
							label: __('Normal Color', 'product-review-blocks'),
						},
						{
							value: readMoreBtnHoverColor,
							onChange: (value) =>
								setAttributes({ readMoreBtnHoverColor: value }),
							label: __('Hover Color', 'product-review-blocks'),
						},
					]}
				/>
				<PanelColorSettings
					title={__('Call to Action Colors', 'product-review-blocks')}
					initialOpen={true}
					colorSettings={[
						{
							value: ctaColor,
							onChange: (value) =>
								setAttributes({ ctaColor: value }),
							label: __(
								'Normal Text Color',
								'product-review-blocks'
							),
						},
						{
							value: ctaBgColor,
							onChange: (value) =>
								setAttributes({ ctaBgColor: value }),
							label: __(
								'Normal Background',
								'product-review-blocks'
							),
						},
						{
							value: ctaHoverColor,
							onChange: (value) =>
								setAttributes({ ctaHoverColor: value }),
							label: __(
								'Hover Text Color',
								'product-review-blocks'
							),
						},
						{
							value: ctaHoverBgColor,
							onChange: (value) =>
								setAttributes({ ctaHoverBgColor: value }),
							label: __(
								'Hover Background',
								'product-review-blocks'
							),
						},
					]}
				/>
			</InspectorControls>

			<div
				{...useBlockProps({
					className: id,
				})}
			>
				<InnerBlocks
					allowedBlocks={['prb/product']}
					template={[['prb/product']]}
					renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
				/>
			</div>
		</Fragment>
	);
}
