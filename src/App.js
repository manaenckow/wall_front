import React, {useState, useEffect} from 'react';
import {
    View,
    ScreenSpinner,
    AdaptivityProvider,
    AppRoot,
    ConfigProvider,
    SplitLayout,
    SplitCol,
    ModalRoot, ModalCard, Textarea, Button, FormLayout, FormItem, Input, Avatar, Snackbar
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Post from './panels/Post';

import {Icon16Cancel, Icon16Clear, Icon16Done} from "@vkontakte/icons";

const App = () => {
    const [scheme, setScheme] = useState('bright_light')
    const [activePanel, setActivePanel] = useState('home');
    const [error, setError] = useState(0);
    const [title, setTitle] = useState(undefined);
    const [small_description, setSmall_description] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [wall, setWall] = useState([]);
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
    const [snackbar, setSnackbar] = useState(null);
    const [activeModal, setActiveModal] = useState(null);

    useEffect(() => {
        try {
            setWall(JSON.parse(localStorage.wall) || []);
        } catch (e) {
            setWall([]);
        }
        setPopout(null);
    }, [snackbar]);

    const go = e => {
        setActivePanel(e.currentTarget.dataset.to);
    };

    const showSnackBar = (type, text) => {
        setSnackbar(
            <Snackbar
                duration={3000}
                layout="vertical"
                style={{zIndex: 10}}
                onClose={() => setSnackbar(null)}
                before={
                    <Avatar size={24} style={{backgroundColor: type === 1 ? '#FF0000' : '#4bb34b'}}>
                        {type === 1 ? <Icon16Clear fill="#fff" width={14} height={14}/> :
                            <Icon16Done fill="#fff" width={14} height={14}/>}
                    </Avatar>
                }
                after={<Avatar size={14} onClick={() => setSnackbar(null)}>
                    <Icon16Cancel width={14} height={14}/>
                </Avatar>}
            >
                {text}
            </Snackbar>
        )
    };

    const setModal = e => {
        setActiveModal(e);
    };

    const createPost = () => {
        const wall_data = wall;
        setError(1);

        if (!title?.trim()) {
            return //showSnackBar(1, '');
        } else if (!small_description?.trim()) {
            return //showSnackBar(1, 'Краткое описание должно быть длиннее 10-ти символов');
        } else if (!description?.trim()) {
            return //showSnackBar(1, 'Краткое описание не должно быть длиннее 200 символов');
        }

        wall_data.push({
            title,
            small_description,
            description,
            id: parseInt(Math.random() * 1e7)
        });

        setWall(wall_data);
        localStorage.wall = JSON.stringify(wall_data);

        setActiveModal(null);

        setTitle(undefined);
        setSmall_description(undefined);
        setDescription(undefined);
        setError(0);
    }

    const modal = (
        <ModalRoot
            onClose={() => setActiveModal(null)}
            activeModal={activeModal}
        >
            <ModalCard
                id={'new'}
                onClose={() => setActiveModal(null)}
                header="Новая запись"
                actions={
                    <Button
                        size="l"
                        mode="primary"
                        onClick={() => {
                            createPost();
                        }}
                    >
                        Опубликовать
                    </Button>
                }
            >
                <FormLayout style={{margin: -12}}>
                    <FormItem top='Заголовок'
                              status={(title === undefined && !error) ? "" : title?.trim() ? "valid" : "error"}
                              bottom={title === undefined ? "" : title.trim() ? '' : 'Поле не может быть пустым'}>
                        <Input placeholder='Я купил кота' value={title || ''}
                               onChange={(e) => setTitle(e.currentTarget.value?.trim())}/>
                    </FormItem>
                    <FormItem top='Краткое описание'
                              status={(small_description === undefined && !error) ? "" : small_description?.trim() ? "valid" : "error"}
                              bottom={small_description === undefined ? "" : small_description.trim() ? '' : 'Поле не может быть пустым'}>
                        <Input placeholder='Кот добрый и не царапается'
                               value={small_description || ''}
                               onChange={(e) => setSmall_description(e.currentTarget.value?.trim())}/>
                    </FormItem>
                    <FormItem top='Полное описание'
                              value={description || ''}
                              status={(description === undefined && !error) ? "" : description?.trim() ? "valid" : "error"}
                              bottom={description === undefined ? "" : description.trim() ? '' : 'Поле не может быть пустым'}>
                        <Textarea placeholder='В общем, я был не прав...'
                                  onChange={(e) => setDescription(e.currentTarget.value?.trim())}/>
                    </FormItem>
                </FormLayout>
            </ModalCard>
        </ModalRoot>
    )


    const props = {wall, snackbar, setModal, go};

    return (
        <ConfigProvider scheme={scheme}>
            <AdaptivityProvider>
                <AppRoot>
                    <SplitLayout popout={popout} modal={modal}>
                        <SplitCol>
                            <View activePanel={activePanel}>
                                <Home id='home' {...props}/>
                                <Post id='post' {...props}/>
                            </View>
                        </SplitCol>
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default App;
