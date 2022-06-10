import React from 'react';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import './Post.css';

const Post = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
		>
			Запись
		</PanelHeader>

	</Panel>
);


export default Post;
