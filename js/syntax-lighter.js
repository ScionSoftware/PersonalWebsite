var syntax_worker = function () {
    this.regex = function (markup) {
  
        markup = markup.replace(/</g, '&lt;');
        markup = markup.replace(/>/g, '&gt;');

        markup = markup.replace(/[-[\]{}()*+?.,\\^$|#\_]/g, '<span style="background-color: #7cfc00">\$&</span>');

        return markup;
    };
};
