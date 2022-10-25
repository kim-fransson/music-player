import { UserProfileCard, UserProfileCardProps } from './UserProfileCard';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
    title: 'UserProfileCard',
    component: UserProfileCard,
} as ComponentMeta<typeof UserProfileCard>;

const Template: ComponentStory<typeof UserProfileCard> = (args) => (
    <UserProfileCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
    user: {
        displayName: 'Kim Fransson',
        imageUrl: 'https://robohash.org/kim-fransson.png',
        topTracks: [
            { id: '2J2Z1SkXYghSajLibnQHOa', name: 'Unstoppable' },
            { id: '1cx7kDfiHlvQWwPRNxQrfQ', name: 'No One Dies From Love' },
            { id: '27SdWb2rFzO6GWiYDBTD9j', name: 'Cheap Thrills' },
            { id: '4VrWlk8IQxevMvERoX08iC', name: 'Chandelier' },
            { id: '5cpJFiNwYyWwFLH0V6B3N8', name: 'Del Mar' },
        ],
        topArtists: [
            { id: '246dkjvS1zLTtiykXe5h60', name: 'Post Malone' },
            { id: '5WUlDfRSoLAfcVSX1WnrxN', name: 'Sia' },
            { id: '7dGJo4pcD2V6oG8kP0tJRR', name: 'Eminem' },
            { id: '1vCWHaC5f2uS3yhpwWbIA6', name: 'Avicii' },
            { id: '53XhwfbYqKCa1cC15pYq2q', name: 'Imagine Dragons' },
        ],
    },
} as UserProfileCardProps;
