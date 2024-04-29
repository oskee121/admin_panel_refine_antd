import CustomAvatar from './custom-avatar';
import { Text } from '../text';

type Props = {
  avatarUrl?: string;
  name: string;
  shape?: 'circle' | 'square';
};

export const SelectOptionWithAvatar = ({ avatarUrl, name, shape }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <CustomAvatar
        shape={shape}
        src={avatarUrl}
        name={name}
        // style={{
        //   width: 96,
        //   height: 96,
        //   marginBottom: '24px',
        // }}
      />
      <Text>{name}</Text>
    </div>
  );
};
