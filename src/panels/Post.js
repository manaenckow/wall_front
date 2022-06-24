import React from 'react';

import {
    Button,
    ContentCard,
    Div,
    Group,
    Header,
    SimpleCell,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
    Avatar,
    IconButton, PanelHeaderButton
} from '@vkontakte/vkui';

import './Post.css';
import {
    Icon20DeleteOutline,
    Icon24Add,
    Icon24MoreHorizontal,
    Icon28MoreHorizontal,
    Icon56WriteOutline
} from "@vkontakte/icons";

const Post = props => {
    const {activePost, setModal, deleteComment, showActionSheet} = props;

    return (
        <Panel id={props.id}>
            <PanelHeader left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
                         right={
                             <PanelHeaderButton onClick={showActionSheet}>
                                 <Icon28MoreHorizontal/>
                             </PanelHeaderButton>}
            >
                Запись
            </PanelHeader>
            <Group>
                <Div>
                    <ContentCard
                        subtitle={activePost.title}
                        header={activePost.small_description}
                        caption={activePost.description}
                    />
                </Div>
            </Group>
            <Group>

                {
                    activePost.comments?.length ? <Header mode="secondary" multiline>Комментарии</Header> : null
                }

                {activePost.comments?.length ? activePost.comments.map((comment, key) => (
                        <SimpleCell
                            key={key}
                            before={<Avatar size={48} src={'https://vk.com/images/camera_50.png'}/>}
                            after={
                                <IconButton onClick={() => deleteComment(comment.id)}>
                                    <Icon20DeleteOutline fill={"red"}/>
                                </IconButton>
                            }
                            description={comment.text}
                        >
                            {comment.author}
                        </SimpleCell>
                    )) :
                    <Placeholder
                        icon={<Icon56WriteOutline/>}
                        header="Комментариев нет"
                        action={<Button size="m" stretched onClick={() => setModal('comment')}>
                            <div style={{display: 'flex'}}><Icon24Add/></div>
                        </Button>}
                    >
                        Быть первым всегда приятно
                    </Placeholder>}
            </Group>
        </Panel>
    );
}


export default Post;
