import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';
import { MutableRefObject, SyntheticEvent, useEffect, useState } from 'react';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type PropsArticleParamsForm = {
	refArticle: MutableRefObject<HTMLElement | null>;
	settings: MutableRefObject<Settings>;
	setChange: (value: number) => void;
	isChange: number;
};

export type Settings = {
	'--font-family': string;
	'--font-size': string;
	'--font-color': string;
	'--container-width': string;
	'--bg-color': string;
};

export const ArticleParamsForm = (props: PropsArticleParamsForm) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [font, setFont] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidthArr] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	useEffect(() => {
		const article = props.refArticle.current;
		if (article && isOpen) {
			article.addEventListener('click', handleClickArrowButton);
		}

		return () => {
			if (article && isOpen) {
				article.removeEventListener('click', handleClickArrowButton);
			}
		};
	}, [isOpen]);

	const handleClickArrowButton = () => {
		isOpen ? setIsOpen(false) : setIsOpen(true);
	};

	const handleSubmitForm = (e: SyntheticEvent) => {
		e.preventDefault();
		props.settings.current = {
			'--font-family': font.value,
			'--font-size': fontSize.value,
			'--font-color': fontColor.value,
			'--container-width': contentWidth.value,
			'--bg-color': backgroundColor.value,
		};
		props.setChange(Math.abs(props.isChange) + 1);
	};

	const handleResetForm = () => {
		props.settings.current = {
			'--font-family': defaultArticleState.fontFamilyOption.value,
			'--font-size': defaultArticleState.fontSizeOption.value,
			'--font-color': defaultArticleState.fontColor.value,
			'--container-width': defaultArticleState.contentWidth.value,
			'--bg-color': defaultArticleState.backgroundColor.value,
		};
		setFont(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidthArr(defaultArticleState.contentWidth);
		props.setChange(-Math.abs(props.isChange) - 1);
	};

	const changeFont = (value: OptionType) => {
		setFont(value);
	};

	const changeFontSize = (value: OptionType) => {
		setFontSize(value);
	};

	const changeFontColor = (value: OptionType) => {
		setFontColor(value);
	};

	const changeBackgroundColor = (value: OptionType) => {
		setBackgroundColor(value);
	};

	const changeContentWidth = (value: OptionType) => {
		setContentWidthArr(value);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleClickArrowButton} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleSubmitForm}
					onReset={handleResetForm}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={font}
						options={fontFamilyOptions}
						onChange={changeFont}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={fontSize}
						title='размер шрифта'
						onChange={changeFontSize}
					/>
					<Select
						options={fontColors}
						selected={fontColor}
						title='цвет шрифта'
						onChange={changeFontColor}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={backgroundColor}
						title='цвет фона'
						onChange={changeBackgroundColor}
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						title='ширина контента'
						onChange={changeContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
