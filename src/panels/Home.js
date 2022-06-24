import React from 'react';
import PropTypes from 'prop-types';

import {
    Panel,
    PanelHeader,
    Header,
    Button,
    Group,
    Cell,
    Div,
    Avatar,
    CardGrid,
    ContentCard,
    Placeholder
} from '@vkontakte/vkui';
import {Icon56WriteOutline} from "@vkontakte/icons";

const Home = ({id, wall, setModal, snackbar, setActivePost, setActivePanel}) => {
    console.log(wall)
    return (
        <Panel id={id}>
            <PanelHeader>Лента</PanelHeader>
            {
                wall && wall.length ?
                    <Group>
                        <Div>
                            <Button
                                size={'l'}
                                stretched
                                mode={'secondary'}
                                onClick={() => setModal('new')}
                            >
                                Новая запись
                            </Button>
                        </Div>
                    </Group> : null
            }


            <Group header={wall && wall.length ? <Header mode="secondary">Ваши записи</Header> : null}>
                {
                    wall && wall.length && wall.map ?
                        <CardGrid size="l">
                            {wall ? wall.map((post, key) => {
                                return (
                                    <ContentCard
                                        key={key}
                                        subtitle={post.title}
                                        header={post.small_description}
                                        // caption={post.description}
                                        onClick={() => {
                                            setActivePost(post);
                                            setActivePanel('post');
                                        }}
                                    />
                                )
                            }) : null}
                        </CardGrid>
                        :
                        <Placeholder
                            icon={<Icon56WriteOutline/>}
                            header="Создайте первую запись"
                            action={<Button size="m" onClick={() => setModal('new')}>Новая запись</Button>}
                        >
                            Поделитесь тем, что важно для вас
                        </Placeholder>
                }
            </Group>
            {snackbar}
        </Panel>
    );
}

export default Home;
