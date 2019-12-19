'use strict';

(function() {
  class Tabs {
    constructor(node, content) {
      this.node = node;
      this.tabs = [].slice.call(node.querySelectorAll('li:not(.tabs__bar)'));
      this.activeTab =
        this.tabs.findIndex(function(elm) {
          return elm.classList.contains('active');
        }) || 0;
      this.switcher = {
        elm: node.querySelector('.tabs__bar'),
        line: node.querySelector('.tabs__bar-line')
      };
      this.content = content;
      this.openTab(this.activeTab);
      this.node.addEventListener(
        'click',
        function(e) {
          const index = this.tabs.indexOf(e.target.closest('li'));
          this.openTab(index);
          this.activeTab = index;
        }.bind(this)
      );
    }

    openTab(index) {
      this.node.children[this.activeTab].classList.remove('active');
      var tab = this.node.children[index];
      tab.classList.add('active');
      this.switcher.line.style.width = tab.offsetWidth + 'px';
      this.switcher.line.style.left =
        tab.getBoundingClientRect().left -
        this.switcher.elm.getBoundingClientRect().left +
        'px';

      this.content.children[this.activeTab].classList.remove('active');
      this.content.children[index].classList.add('active');
    }
  }

  const tabs = document.querySelector('.abonements__tabs');
  const content = document.querySelector('.abonements__list');

  new Tabs(tabs, content);
})();
