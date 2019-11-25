import {Component, OnInit} from '@angular/core';
import {computeUtilization} from '../utilization.pipe';

import * as config from '../../assets/anno1404.config.json';
import {People, Peoples} from '../people/People';

interface Foo {
  [key: string]: string;
}

@Component({
  selector: 'app-production-calculator',
  templateUrl: './production-calculator.component.html',
  styleUrls: ['./production-calculator.component.scss']
})
export class ProductionCalculatorComponent implements OnInit {
  people = new Peoples();
  resourceNames: string[] = config.resourceNames;

  constructor() {
  }

  ngOnInit() {
  }

  getConsumption(resource: string): number {
    return this.people.map(people => people.getConsumption(resource, this.people))
      .filter(cons => cons)
      .reduce((x, y) => x + y, 0); // TODO perf : define var in html
  }

  emptyGaugeHeight(buildingCount: number) {
    if (!buildingCount) {
      return 100;
    }
    return 100 - computeUtilization(buildingCount) * 100;
  }

  gaugeColor(buildingCount: number) {
    const utilization = computeUtilization(buildingCount);
    if (utilization >= 0.94) {
      return '#ff5353';
    }
    if (utilization >= 0.6) {
      return '#f7ffa2';
    }
    return '#88ff6d';
  }

  getImageSrc(key: string): string {
    return `assets/images/${key}.png`;
  }
}
