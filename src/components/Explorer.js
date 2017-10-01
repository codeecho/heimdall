import React from 'react';

const Explorer = ({directory}) => {
    return (
        <div class="explorer">
            {directory.children.map(diskItem => <DiskItem key={diskItem.name} diskItem={diskItem}/>)}
        </div>
    )
}

const DiskItem = ({diskItem}) => {
    const iconClass = 'disk-item-icon ' + diskItem.type;
    return (
        <div class="disk-item">
            <div class={iconClass}> </div>
            <span class='disk-item-name'>{diskItem.name}</span>
        </div>
    )
}

export default Explorer;