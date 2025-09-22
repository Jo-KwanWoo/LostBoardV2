import React from 'react';
import { Card, CardContent, Chip, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// 스타일드 컴포넌트
const StyledCard = styled(Card)(({ theme }) => ({
  background: 'var(--bg-card)',
  border: '2px solid var(--border-color)',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  marginBottom: '16px',
  overflow: 'visible',
  position: 'relative',
  width: '100%',
  maxWidth: '420px',
  minWidth: '300px',
  
  '&:hover': {
    borderColor: 'var(--primary-gold)',
    boxShadow: 'var(--shadow-gold)',
    transform: 'translateY(-4px)',
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, var(--primary-gold), var(--primary-gold-light))',
    borderRadius: '16px 16px 0 0',
  }
}));

const CharacterAvatar = styled('div')(({ theme }) => ({
  width: 60,
  height: 60,
  border: '2px solid var(--primary-gold)',
  boxShadow: '0 0 15px var(--primary-gold-glow)',
  background: 'var(--bg-tertiary)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.3))',
  }
}));

const ItemLevelChip = styled(Chip)(({ itemlevel }) => {
  const getColorByLevel = (level) => {
    if (level >= 1700) return { bg: '#FF6B6B', color: '#FFF' }; // 빨간색 (최고급)
    if (level >= 1640) return { bg: '#4ECDC4', color: '#FFF' }; // 청록색 (고급)
    if (level >= 1580) return { bg: '#45B7D1', color: '#FFF' }; // 파란색 (중급)
    if (level >= 1490) return { bg: '#96CEB4', color: '#FFF' }; // 초록색 (기본)
    return { bg: '#FFEAA7', color: '#2D3436' }; // 노란색 (낮음)
  };
  
  const colors = getColorByLevel(itemlevel);
  
  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 'bold',
    fontSize: '0.9rem',
    height: '32px',
    boxShadow: `0 0 15px ${colors.bg}40`,
    border: `1px solid ${colors.bg}`,
  };
});

function CharacterCard({ characterInfo, characterIndex, children }) {
  const itemLevel = parseFloat(characterInfo?.ItemAvgLevel?.replace(/,/g, "") || "0");
  
  return (
    <StyledCard>
      <CardContent sx={{ padding: '16px' }}>
        <Box display="flex" alignItems="center" gap={2} marginBottom={1.5}>
          {/* 캐릭터 아바타 */}
          <CharacterAvatar>
            <img
              src={`${process.env.PUBLIC_URL}/class_logo/${characterInfo.CharacterClassName}.png`}
              alt={characterInfo.CharacterClassName}
            />
          </CharacterAvatar>
          
          {/* 캐릭터 정보 */}
          <Box flex={1}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'var(--text-primary)', 
                fontWeight: 'bold',
                marginBottom: '4px',
                fontSize: '1.1rem'
              }}
            >
              {characterInfo.CharacterName}
            </Typography>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'var(--text-secondary)', 
                marginBottom: '8px',
                fontSize: '0.9rem'
              }}
            >
              {characterInfo.CharacterClassName}
            </Typography>
            
            <ItemLevelChip
              label={`아이템 레벨 ${characterInfo.ItemAvgLevel}`}
              itemlevel={itemLevel}
            />
          </Box>
        </Box>
        
        {/* 레이드 목록 영역 */}
        <Box sx={{ marginTop: '16px' }}>
          {children}
        </Box>
      </CardContent>
    </StyledCard>
  );
}

export default CharacterCard;