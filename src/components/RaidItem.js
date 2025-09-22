import React from 'react';
import { 
  Box, 
  Typography, 
  Switch, 
  Select, 
  MenuItem, 
  FormControl,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
// 커스텀 아이콘 컴포넌트들
const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const RadioButtonUncheckedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
  </svg>
);

const GoldIcon = () => (
  <img 
    src={`${process.env.PUBLIC_URL}/items/Gold.webp`}
    alt="골드"
    style={{
      width: '20px',
      height: '20px',
      objectFit: 'contain'
    }}
  />
);

const AddIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
);

// 스타일드 컴포넌트
const RaidContainer = styled(Box)(({ ischecked, isgoldselected }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  margin: '6px 0',
  background: ischecked === 'true' 
    ? 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))' 
    : 'var(--bg-tertiary)',
  border: `2px solid ${
    ischecked === 'true' 
      ? 'var(--primary-gold)' 
      : 'var(--border-color)'
  }`,
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  
  '&:hover': {
    borderColor: 'var(--primary-gold)',
    transform: 'translateX(4px)',
    boxShadow: '0 4px 20px rgba(212, 175, 55, 0.2)',
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '4px',
    background: ischecked === 'true' 
      ? 'linear-gradient(180deg, var(--primary-gold), var(--primary-gold-light))'
      : 'transparent',
    transition: 'all 0.3s ease',
  }
}));

const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      color: 'var(--primary-gold)',
      '& + .MuiSwitch-track': {
        backgroundColor: 'var(--primary-gold)',
        opacity: 0.7,
      },
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: 'var(--border-color)',
  },
}));

const DifficultySelect = styled(Select)(({ theme }) => ({
  minWidth: 110,
  maxWidth: 110,
  width: 110,
  height: 36,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--border-color)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--primary-gold)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--primary-gold)',
  },
  '& .MuiSelect-select': {
    color: 'var(--text-primary)',
    fontSize: '0.8rem',
    padding: '8px 12px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'visible',
    textOverflow: 'clip',
  },
  '& .MuiSelect-icon': {
    color: 'var(--text-secondary)',
  },
}));

const GoldButton = styled(IconButton)(({ isselected, disabled }) => ({
  color: isselected === 'true' ? 'var(--primary-gold)' : 'var(--text-muted)',
  backgroundColor: isselected === 'true' ? 'var(--primary-gold-glow)' : 'transparent',
  border: `2px solid ${isselected === 'true' ? 'var(--primary-gold)' : 'var(--border-color)'}`,
  borderRadius: '6px',
  padding: '6px',
  transition: 'all 0.3s ease',
  opacity: disabled ? 0.5 : 1,
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  
  '&:hover': {
    backgroundColor: disabled ? 'transparent' : 'var(--primary-gold-glow)',
    borderColor: disabled ? 'var(--border-color)' : 'var(--primary-gold)',
    transform: disabled ? 'none' : 'scale(1.05)',
  },
  
  '&:disabled': {
    cursor: 'not-allowed',
  },
  
  '& svg': {
    fontSize: '1.2rem',
  },
  
  '& img': {
    filter: isselected === 'true' ? 'brightness(1.2) saturate(1.3)' : 'brightness(0.7)',
    transition: 'filter 0.3s ease',
  },
  
  '&:hover img': {
    filter: disabled ? 'brightness(0.7)' : 'brightness(1.2) saturate(1.3)',
  }
}));

function RaidItem({ 
  raidName, 
  isChecked, 
  isGoldSelected, 
  isAdditionalSelected,
  isGoldDisabled,
  isAdditionalDisabled,
  difficulty,
  difficulties,
  onRaidToggle,
  onGoldToggle,
  onAdditionalToggle,
  onDifficultyChange
}) {
  
  return (
    <RaidContainer 
      ischecked={isChecked.toString()} 
      isgoldselected={isGoldSelected.toString()}
    >
      {/* 왼쪽: 레이드 정보 */}
      <Box display="flex" alignItems="center" gap={2} flex={1}>
        {/* 클리어 체크 */}
        <Tooltip title={isChecked ? "클리어 완료" : "클리어 대기"}>
          <IconButton 
            onClick={() => onRaidToggle({ target: { checked: !isChecked } })}
            sx={{ 
              color: isChecked ? 'var(--accent-green)' : 'var(--text-muted)',
              '&:hover': { 
                color: 'var(--accent-green)',
                transform: 'scale(1.1)' 
              }
            }}
          >
            {isChecked ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
          </IconButton>
        </Tooltip>
        
        {/* 레이드 이름 */}
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'var(--text-primary)',
            fontWeight: isChecked ? 'bold' : 'normal',
            fontSize: '0.9rem',
            minWidth: '100px'
          }}
        >
          {raidName}
        </Typography>
        
        {/* 난이도 선택 */}
        <FormControl size="small">
          <DifficultySelect
            value={difficulty}
            onChange={onDifficultyChange}
            displayEmpty
          >
            {(Array.isArray(difficulties) ? difficulties : []).map((diff, index) => (
              <MenuItem key={index} value={diff}>
                <Chip 
                  label={diff} 
                  size="small"
                  sx={{
                    backgroundColor: diff === 'hard' ? '#FF6B6B' : 
                                   diff === 'normal' ? '#4ECDC4' : '#96CEB4',
                    color: 'white',
                    fontWeight: 'bold',
                    minWidth: '60px',
                    width: '60px',
                    fontSize: '0.75rem'
                  }}
                />
              </MenuItem>
            ))}
          </DifficultySelect>
        </FormControl>
      </Box>
      
      {/* 오른쪽: 보상 선택 */}
      <Box display="flex" alignItems="center" gap={1}>
        {/* 골드 획득 */}
        <Tooltip title={isGoldDisabled ? "골드 획득 한도 초과 (3개)" : "골드 획득"}>
          <span>
            <GoldButton
              isselected={isGoldSelected.toString()}
              disabled={isGoldDisabled}
              onClick={() => onGoldToggle({ target: { checked: !isGoldSelected } })}
            >
              <GoldIcon />
            </GoldButton>
          </span>
        </Tooltip>
        
        {/* 더보기 보상 */}
        <Tooltip title={isAdditionalDisabled ? "레이드 클리어 필요" : "더보기 보상"}>
          <span>
            <GoldButton
              isselected={isAdditionalSelected.toString()}
              disabled={isAdditionalDisabled}
              onClick={() => onAdditionalToggle({ target: { checked: !isAdditionalSelected } })}
            >
              <AddIcon />
            </GoldButton>
          </span>
        </Tooltip>
      </Box>
    </RaidContainer>
  );
}

export default RaidItem;