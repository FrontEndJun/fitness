'use strict';

(function () {
  function UInput(node) {
    this.input = node.querySelector('input');
    this.label = node.querySelector('label');
    this.create();
  }
  UInput.prototype.create = function () {
    this.input.onblur = this.blur.bind(this);
  };
  UInput.prototype.blur = function () {
    if (this.input.value === '') {
      this.label.style.position = 'relative';
    } else {
      this.label.style.position = 'static';
    }
  };
  function Tabs(node, content) {
    this.node = node;
    this.tabs = [].slice.call(node.querySelectorAll('li:not(.tabs__bar)'));
    this.activeTab =
      this.tabs.findIndex(function (elm) {
        return elm.classList.contains('active');
      }) || 0;
    this.content = content;
    this.openTab(this.activeTab);
    this.node.addEventListener('click', function (e) {
      var index = this.tabs.indexOf(e.target.closest('li'));
      if (index === -1) {
        return;
      }
      this.openTab(index);
      this.activeTab = index;
    }.bind(this)
    );
  }
  Tabs.prototype.openTab = function (index) {
    this.node.children[this.activeTab].classList.remove('active');
    var tab = this.node.children[index];
    tab.classList.add('active');

  };

  function Slider(sliderNode, slidesToShow) {
    this.slides = sliderNode.querySelectorAll('.slide');
    this.curSlide = 0;
    this.slidesToShow = slidesToShow || 1;
    this.controls = {
      prev: sliderNode.querySelector('button.prev'),
      next: sliderNode.querySelector('button.next')
    };
    this.controls.prev.onclick = this.prevSlide.bind(this);
    this.controls.next.onclick = this.nextSlide.bind(this);
    this.show();
  }
  Slider.prototype.prevSlide = function () {
    var sl = this.curSlide - this.slidesToShow;
    this.curSlide = sl < 0 ? 0 : sl;
    this.show();
  };
  Slider.prototype.nextSlide = function () {
    var sl = this.curSlide + this.slidesToShow;
    var l = this.slides.length;
    this.curSlide = sl >= l ? this.curSlide : sl;
    this.show();
  };
  Slider.prototype.show = function () {
    for (var i = 0; i < this.slides.length; i++) {
      var cond = i >= this.curSlide && i < this.curSlide + this.slidesToShow;
      if (cond) {
        this.slides[i].classList.add('active');
      } else {
        this.slides[i].classList.remove('active');
      }
    }
  };

  function createSlider(node, slides) {
    var s = new Slider(node, slides);
    return s;
  }

  function createUInput(node) {
    var i = new UInput(node);
    return i;
  }

  function createTabs(tabs, content) {
    var t = new Tabs(tabs, content);
    return t;
  }

  function adapSlides() {
    if (document.documentElement.clientWidth >= 1200) {
      tSlider.slidesToShow = 4;
    } else if (document.documentElement.clientWidth < 767) {
      tSlider.slidesToShow = 1;
    } else {
      tSlider.slidesToShow = 2;
    }
    tSlider.show();
  }

  var tabs = document.querySelector('.abonements__tabs');
  var content = document.querySelector('.abonements__list');

  var inputs = document.querySelectorAll('.uinput');
  var advantages = document.querySelectorAll('.advantage');

  for (var i = 0; i < advantages.length; i++) {
    var elm = advantages[i];
    var svg = elm.querySelector('svg');
    if (!svg) {
      continue;
    }
    var t = svg.querySelector('text');
    var w = t.clientWidth;
    var h = t.getBoundingClientRect().height;
    svg.setAttribute('width', +w);
    svg.setAttribute('height', +h);
  }

  for (i = 0; i < inputs.length; i++) {
    createUInput(inputs[i]);
  }

  createTabs(tabs, content);
  var tSlider = createSlider(document.querySelector('.slider'), 4);
  createSlider(document.querySelector('.reviews__slider'), 1);
  adapSlides();
})();
