import LoginButton from './LoginButton';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
    title: 'LoginButton',
    component: LoginButton,
} as ComponentMeta<typeof LoginButton>;

const Template: ComponentStory<typeof LoginButton> = (args) => (
    <LoginButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    authUrl:
        'https://accounts.spotify.com/authorize?client_id=a69ac96af17b446288005e4c5130ee85&response_type=code&redirect_uri=http://localhost:3000&scope=streaming&%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20',
};
