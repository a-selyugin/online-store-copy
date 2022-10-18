import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './slider.scss';

export class Slider {
  slider: noUiSlider.target;
  divID: string;
  header: string;
  range: [number, number];

  constructor(containerID: string, header: string, range: [number, number]) {
    this.slider = document.createElement('div');
    this.divID = containerID;
    this.header = header;
    this.range = range;
  }

  public draw(): void {
    const sliderWrapper: HTMLElement | null = document.getElementById(
      this.divID
    );

    const sliderHeader: HTMLHeadElement = document.createElement('h3');
    sliderHeader.innerHTML = this.header;

    const inputWrapper: HTMLDivElement = document.createElement('div');
    inputWrapper.classList.add('sliders__input-wrapper');

    const inputFrom: HTMLInputElement = document.createElement('input');
    inputFrom.type = 'text';

    const inputTo: HTMLInputElement = document.createElement('input');
    inputTo.type = 'text';

    const slider: noUiSlider.target = this.slider;

    inputWrapper.appendChild(inputFrom);
    inputWrapper.appendChild(inputTo);

    if (sliderWrapper) {
      sliderWrapper.appendChild(sliderHeader);
      sliderWrapper.appendChild(this.slider);
      sliderWrapper.appendChild(inputWrapper);

      noUiSlider.create(slider, {
        start: [this.range[0], this.range[1]],
        step: 1,
        connect: true,
        range: {
          min: this.range[0],
          max: this.range[1],
        },
      });

      slider.noUiSlider?.on(
        'update',
        (values) => (inputFrom.value = String(Math.floor(+values[0])))
      );
      slider.noUiSlider?.on(
        'update',
        (values) => (inputTo.value = String(Math.floor(+values[1])))
      );

      inputFrom.addEventListener('change', function () {
        slider.noUiSlider?.setHandle(0, this.value, true);
      });
      inputTo.addEventListener('change', function () {
        slider.noUiSlider?.setHandle(1, this.value, true);
      });
    }
  }

  public reset(): void {
    this.slider.noUiSlider?.reset();
  }
}
