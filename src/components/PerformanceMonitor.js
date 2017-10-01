import React from 'react';
import Spinner from './Spinner';

const PerformanceMonitor = () => {
    return (
        <div class="performance-monitor">
            <div class="row">
                <Spinner text="CPU" updateInterval={1000}/>
            </div>
            <div class="row">
                <Spinner text="RAM" startingValue={12} updateInterval={3000}/>
            </div>
            <div class="row">
                <Spinner text="Disk" startingValue={16} updateInterval={0}/>
            </div>
        </div>
    );
}

export default PerformanceMonitor;