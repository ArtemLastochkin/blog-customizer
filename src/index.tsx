import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useRef, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	Settings,
} from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isChange, setChange] = useState<number>(0);
	const refArticle = useRef<HTMLElement | null>(null);
	const settings = useRef<Settings>({
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	});

	return (
		<main
			className={clsx(styles.main)}
			style={settings.current as CSSProperties}>
			<ArticleParamsForm
				setChange={setChange}
				isChange={isChange}
				settings={settings}
				refArticle={refArticle}
			/>
			<Article refArticle={refArticle} />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
