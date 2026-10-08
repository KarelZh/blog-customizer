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
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [fontFamily, setFontFamily] = useState(defaultArticleState.fontFamilyOption);
  const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
  const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
  const [backgroundColor, setBackgroundColor] = useState(
    defaultArticleState.backgroundColor
  );
  const [contentWidth, setContentWidth] = useState(defaultArticleState.contentWidth);

  const handleClickForm = (): void => {
    if (open === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const sidebarRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen: open,
    rootRef: sidebarRef,
    onChange: setOpen,
  });

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    onApply({
      fontFamilyOption: fontFamily,
      fontSizeOption: fontSize,
      fontColor: fontColor,
      backgroundColor: backgroundColor,
      contentWidth: contentWidth,
    });
  };

  const handleReset = (): void => {
    setFontFamily(defaultArticleState.fontFamilyOption);
    setFontSize(defaultArticleState.fontSizeOption);
    setFontColor(defaultArticleState.fontColor);
    setBackgroundColor(defaultArticleState.backgroundColor);
    setContentWidth(defaultArticleState.contentWidth);

    onApply(defaultArticleState);
  };

  return (
    <>
      <ArrowButton isOpen={open} onClick={handleClickForm} />
      <aside
        ref={sidebarRef}
        className={clsx(styles.container, { [styles.container_open]: open })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase={true}>
            Задайте параметры
          </Text>
          <Select
            onChange={setFontFamily}
            title="Шрифт"
            selected={fontFamily}
            options={fontFamilyOptions}
          />
          <RadioGroup
            name="Font size"
            options={fontSizeOptions}
            selected={fontSize}
            title="Размер шрифта"
            onChange={setFontSize}
          />
          <Select
            title="Цвет шрифта"
            selected={fontColor}
            options={fontColors}
            onChange={setFontColor}
          />
          <Separator />
          <Select
            title="Цвет фона"
            selected={backgroundColor}
            options={backgroundColors}
            onChange={setBackgroundColor}
          />
          <Select
            title="Ширина контента"
            selected={contentWidth}
            options={contentWidthArr}
            onChange={setContentWidth}
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
