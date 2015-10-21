(function(gt){
    /**
     * Проверка наличия класса
     * @param {HTMLElement} $node
     * @param {String} className имя класса
     * @return {Boolean} есть/нет
     */
    gt.hasClass = function($node, className){
        return $node.className.indexOf(className) !== -1;
    };

    /**
     * Добавить класс элементу
     * @param {HTMLElement} $node
     * @param {String} className имя класса
     */
    gt.addClass = function($node, className){
        if (!gt.hasClass($node, className)){
            $node.className += ' ' + className;
        }
    };

    /**
     * Удалить класс элемента
     * @param {HTMLElement} $node
     * @param {String} className имя класса
     */
    gt.removeClass = function($node, className){
        var classesList;
        if (gt.hasClass($node, className)){
            classesList = $node.className.split(' ');
            gt.deleteElementsInArray(classesList, className);
            $node.className = classesList.join(' ');
        }
    };

    /**
     * Удалить классы элемента
     * @param {HTMLElement} $node
     * @param {String|...} [className]
     * Метод принимает любое количество классов, т.е. метод можно использовать
     * SWF01.removeClasses(document.getElementById('myElement'), 'asd', 'sdf', 'qwe', 'wer', 'zxc', 'xcv')
     * или
     * SWF01.removeClasses(document.getElementById('myElement'), 'asd', 'sdf')
     */
    gt.removeClasses = function($node, className){
        var classesList = $node.className.split(' '),
            i = classesList.length,
            jMax = arguments.length,
            j;

        for (; i-- ;){
            for (j = jMax; j -= 1;){
                if (classesList[i] === arguments[j]){
                    gt.arraySlice(classesList, i, 1);
                    break;
                }
            }
        }

        $node.className = classesList.join(' ');
    };

    /**
     * Заменить класс элемента
     * @param {HTMLBRElement} $node
     * @param {String} replacedClassName класс который нужно заменить
     * @param {String} newClassName класс на который нужно заменить предидущий класс
     */
    gt.replaceClass = function($node, replacedClassName, newClassName){
        if (gt.hasClass($node, replacedClassName)){
            $node.className = $node.className.replace(replacedClassName, newClassName);
        }
    };

    /**
     * getParentByClass вернуть родителя с классом
     * @param {HTMLElement} $node HTML элемет относительно которого нужно идти по цепочке родителей
     * @param {String} className класс родителя
     * @param {Boolean} [isWithMe] флаг начала анализа с себя
     * @return {HTMLElement} возвращает найденого родителя или null
     */
    gt.getParentByClass = function($node, className, isWithMe){
        if (isWithMe !== true){
            $node = $node.parentNode;
        }
        while (($node !== null) && ($node.nodeName !== '#document') && ($node.nodeName !== '#document-fragment')){
            if (gt.hasClass($node, className)){
                return $node;
            }
            $node = $node.parentNode;
        }
        return null;
    };


}(GT));