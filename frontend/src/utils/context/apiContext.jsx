import React, { useState } from 'react';

const ApiContext = React.createContext([{}, () => {}]);

const ApiProvider = (props) => {
	const [mockedStatus, setMockedStatus] = useState(null);
	return <ApiContext.Provider value={[mockedStatus, setMockedStatus]}>{props.children}</ApiContext.Provider>;
};

export { ApiContext, ApiProvider };
