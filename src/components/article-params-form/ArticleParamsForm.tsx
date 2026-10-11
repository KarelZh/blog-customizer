import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { useOutsideClickClose } from '@/ui/select/hooks/useOutsideClickClose';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { clsx } from 'clsx';
import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import {
  fontFamilyOptions,
  defaultArticleState,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  type ArticleStateType,
  type OptionType,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  //const [fontFamily, setFontFamily] = useState(defaultArticleState.fontFamilyOption);
  //const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
  //const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
  //const [backgroundColor, setBackgroundColor] = useState(
  //  defaultArticleState.backgroundColor
  //);
  //const [contentWidth, setContentWidth] = useState(defaultArticleState.contentWidth);

  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const handleChange =
    (key: keyof ArticleStateType) =>
    (option: OptionType): void => {
      setFormState((prev) => ({ ...prev, [key]: option }));
    };

  const handleToggleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

  const sidebarRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen: isSidebarOpen,
    rootRef: sidebarRef,
    onChange: setIsSidebarOpen,
  });

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    onApply({
      fontFamilyOption: formState.fontFamilyOption,
      fontSizeOption: formState.fontSizeOption,
      fontColor: formState.fontColor,
      backgroundColor: formState.backgroundColor,
      contentWidth: formState.contentWidth,
    });
  };

  const [radioGroupKey, setRadioGroupKey] = useState(0);

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
    setRadioGroupKey((prev) => prev + 1);
  };

  return (
    <>
      <ArrowButton isOpen={isSidebarOpen} onClick={handleToggleSidebar} />
      <aside
        ref={sidebarRef}
        className={clsx(styles.container, { [styles.container_open]: isSidebarOpen })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase={true}>
            Задайте параметры
          </Text>
          <Select
            selected={formState.fontFamilyOption}
            onChange={handleChange('fontFamilyOption')}
            title="Шрифт"
            options={fontFamilyOptions}
          />
          <RadioGroup
            key={radioGroupKey}
            name="fontSize"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            title="Размер шрифта"
            onChange={handleChange('fontSizeOption')}
          />
          <Select
            title="Цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={handleChange('fontColor')}
          />
          <Separator />
          <Select
            title="Цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={handleChange('backgroundColor')}
          />
          <Select
            title="Ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={handleChange('contentWidth')}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
