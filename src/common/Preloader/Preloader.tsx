import preloader from '../../assets/preloader.gif';
import React from 'react';

// Image indicating the data loading

const Preloader: React.FC = () => {
    return <div>
        <img src={preloader} />
    </div>
}

export default Preloader
