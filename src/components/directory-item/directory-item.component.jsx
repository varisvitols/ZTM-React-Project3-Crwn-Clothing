import { DirectoryItemContainer, BackgroundImage, Body } from './directory-item.styles';

const DirectoryItem = ({ category: { imageUrl, title} }) => {
    return (
        <DirectoryItemContainer>
          <BackgroundImage imageUrl={imageUrl} style={{
            backgroundImage: `url(${imageUrl})`
          }} />
          <Body>
            <h2>{title}</h2>
            <p>Shop now</p>
          </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem