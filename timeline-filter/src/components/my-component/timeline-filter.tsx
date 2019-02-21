import { Component, Prop } from '@stencil/core';
import { Method } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'timeline-filter',
  styleUrl: 'my-component.css',
  shadow: true
})
export class TimelineFilter {
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
  @Prop() config: object;

  async tapMe() {
    return Promise.resolve(42);
  }

  // @Method()
  // tapMe(): void {
  //   console.log(42);
  // }



  getText() {
    return format(this.first, this.middle, this.last);
  }


  render() {
    return (
    <div class="col-sm-6">
      {this.getText()}
      <span>{this.first} andy </span>
      <div class="pull-right">
        <button class="btn btn-default no-padding" ng-click="_getBarChartData('8hr')">
          <img ng-src="src/apps/battery/assets/images/interval8Hours.png" width="21"
               src="assets/interval8Hours.png" />
        </button>
        <button class="btn btn-default no-padding" ng-click="_getBarChartData('24hr')">
          <img src="assets/interval24Hours.png" width="21"/>
        </button>
        <button class="btn btn-default no-padding" ng-click="_getBarChartData('weekly')">
          <img src="assets/intervalWeek.png" width="21"/>
        </button>
        <button class="btn btn-default no-padding" ng-click="_getBarChartData('monthly')">
          <img src="assets/intervalMonth.png" width="21"/>
        </button>
        <button class="btn btn-default no-padding" ng-click="_getBarChartData('yearly')">
          <img src="assets/intervalYear.png" width="21"/>
        </button>
      </div>
    </div>
    );
  }
}
