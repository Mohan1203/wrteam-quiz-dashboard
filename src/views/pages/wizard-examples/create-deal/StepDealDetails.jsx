import { useState, forwardRef } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { formatDate } from 'date-fns/format'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Vars
const offeredItemsArray = ['Apple iPhone 12 Pro', 'Apple iPhone 12 Mini', 'Apple iPhone 12', 'Apple iPhone 11 Pro Max']

const CustomInput = forwardRef((props, ref) => {
  // Vars
  const startDate = props.start !== null ? formatDate(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${formatDate(props.end, 'MM/dd/yyyy')}` : null
  const value = `${startDate}${endDate !== null ? endDate : ''}`

  return <CustomTextField fullWidth inputRef={ref} label={props.label || ''} {...props} value={value} />
})

function StepDealDetails({ activeStep, handleNext, handlePrev, steps }) {
  // States
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [offeredItems, setOfferedItems] = useState([])

  const handleChange = event => {
    setOfferedItems(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value)
  }

  const handleDateChange = (dates, event) => {
    const [start, end] = dates

    setStartDate(start)
    setEndDate(end)
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <CustomTextField fullWidth label='Deal Title' placeholder='Black Friday sale, 25% off' />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <CustomTextField fullWidth label='Deal Code' placeholder='25PEROFF' />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <CustomTextField
          fullWidth
          multiline
          minRows={4}
          label='Deal Description'
          placeholder='To sell or distribute something as a business deal'
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              select
              fullWidth
              slotProps={{
                select: {
                  multiple: true, // @ts-ignore
                  onChange: handleChange,
                  renderValue: selected => (
                    <div className='flex flex-wrap gap-2'>
                      {selected.map((value, index) => (
                        <Chip size='small' key={index} label={value} />
                      ))}
                    </div>
                  )
                }
              }}
              label='Offered Items'
              value={offeredItems}
            >
              {offeredItemsArray.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField select fullWidth label='Cart Condition' defaultValue=''>
              <MenuItem value=''>
                <Typography color='text.primary' noWrap>
                  Select Condition
                </Typography>
              </MenuItem>
              <MenuItem value='all'>
                <Typography color='text.primary' noWrap>
                  Cart must contain all selected Downloads
                </Typography>
              </MenuItem>
              <MenuItem value='any'>
                <Typography color='text.primary' noWrap>
                  Cart needs one or more of the selected Downloads
                </Typography>
              </MenuItem>
            </CustomTextField>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <AppReactDatepicker
          selectsRange
          endDate={endDate}
          selected={startDate}
          startDate={startDate}
          id='date-range-picker'
          onChange={handleDateChange}
          shouldCloseOnSelect={false}
          customInput={<CustomInput label='Deal Duration' start={startDate} end={endDate} />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormControl>
          <FormLabel>Notify Users</FormLabel>
          <FormGroup aria-label='position' row>
            <FormControlLabel value='email' label='Email' control={<Checkbox />} />
            <FormControlLabel value='sms' label='SMS' control={<Checkbox />} />
            <FormControlLabel control={<Checkbox />} value='push-notification' label='Push Notification' />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <div className='flex items-center justify-between'>
          <Button
            variant='tonal'
            color='secondary'
            disabled={activeStep === 0}
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
          >
            Previous
          </Button>
          <Button
            variant='contained'
            color={activeStep === steps.length - 1 ? 'success' : 'primary'}
            onClick={handleNext}
            endIcon={
              activeStep === steps.length - 1 ? (
                <i className='tabler-check' />
              ) : (
                <DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />
              )
            }
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepDealDetails
