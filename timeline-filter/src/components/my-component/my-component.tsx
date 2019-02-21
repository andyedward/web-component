import { Component, Prop } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div class="col-sm-6">
      <div class="pull-right">
        {this.getText}
        <div class="btn-group" data-toggle="buttons">
        </div>
        <button class="btn btn-default no-padding" ng-click="_getBarChartData('8hr')">
          <img ng-src="src/apps/battery/assets/images/interval8Hours.png" width="21"
               src="src/apps/battery/assets/images/interval8Hours.png" />
        </button>
        <button class="btn btn-default no-padding" ng-click="_getBarChartData('24hr')">
          <img src="src/apps/battery/assets/images/interval24Hours.png" width="21"/>
        </button>
        <button class="btn btn-default no-padding" ng-click="_getBarChartData('weekly')">
          <img src="src/apps/battery/assets/images/intervalWeek.png" width="21"/>
        </button>
        <button class="btn btn-default no-padding" ng-click="_getBarChartData('monthly')">
          <img src="src/apps/battery/assets/images/intervalMonth.png" width="21"/>
        </button>
        <button class="btn btn-default no-padding" ng-click="_getBarChartData('yearly')">
          <img src="src/apps/battery/assets/images/intervalYear.png" width="21"/>
        </button>
      </div>
    </div>;
  }
}
