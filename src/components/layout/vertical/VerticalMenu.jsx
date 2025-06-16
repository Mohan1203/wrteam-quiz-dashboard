// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'
import CustomChip from '@core/components/mui/Chip'

// import { GenerateVerticalMenu } from '@components/GenerateMenu'
// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale } = params
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        {/* Users Management */}
        <SubMenu label={dictionary['navigation'].users} icon={<i className='tabler-users' />}>
          <MenuItem href={`/${locale}/users`}>{dictionary['navigation'].users}</MenuItem>
          <MenuItem href={`/${locale}/teams`}>{dictionary['navigation'].teams}</MenuItem>
        </SubMenu>

        {/* Packages Management*/}
        <SubMenu label={dictionary['navigation'].packages} icon={<i className='tabler-package' />}>
          <MenuItem href={`/${locale}/addpackage`}>{dictionary['navigation'].addPackage}</MenuItem>
          <MenuItem href={`/${locale}/packages`}>{dictionary['navigation'].packages}</MenuItem>
        </SubMenu>

        {/* Quiz bank managements */}
        <SubMenu label={dictionary['navigation'].quizbank} icon={<i className='tabler-script' />}>
          <MenuItem href={`/${locale}/quizbank`}>{dictionary['navigation'].quizbank}</MenuItem>
          <MenuItem href={`/${locale}/addquizbank`}>{dictionary['navigation'].addQuizBank}</MenuItem>
          <MenuItem href={`/${locale}/editquizbank`}>{dictionary['navigation'].editQuizBank}</MenuItem>
        </SubMenu>

        {/* Quiz Management */}
        <SubMenu label={dictionary['navigation'].quizzes} icon={<i className='tabler-script' />}>
          <MenuItem href={`/${locale}/quizbank`}>{dictionary['navigation'].quizbank}</MenuItem>
        </SubMenu>
        {/* <MenuItem href={`/${locale}/quizes`} icon={<i className='tabler-question-mark' />}>
          {dictionary['navigation'].quizzes}
        </MenuItem> */}

        {/* Advertisement Management */}
        <SubMenu label={dictionary['navigation'].advertisement} icon={<i className='tabler-news' />}>
          <MenuItem href={`/${locale}/advertise`}>{dictionary['navigation'].advertisements}</MenuItem>
          <MenuItem href={`/${locale}/addadvertise`}>{dictionary['navigation'].addAdvertise}</MenuItem>
        </SubMenu>

        {/* Staff Management */}
        <SubMenu label={dictionary['navigation'].staff} icon={<i className='tabler-users-group' />}>
          <MenuItem href={`/${locale}/addmember`}>{dictionary['navigation'].addMember}</MenuItem>
        </SubMenu>

        {/* Permission Management */}
        <SubMenu label={dictionary['navigation'].roles} icon={<i className='tabler-lock' />}>
          <MenuItem href={`/${locale}/addroles`}>{dictionary['navigation'].addRole}</MenuItem>
        </SubMenu>

        <SubMenu label={dictionary['navigation'].tags} icon={<i className='tabler-tag' />}>
          <MenuItem href={`/${locale}/taggroup`}>{dictionary['navigation'].addTagGroup}</MenuItem>
          <MenuItem href={`/${locale}/tags`}>{dictionary['navigation'].addTag}</MenuItem>
        </SubMenu>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
