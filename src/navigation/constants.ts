import Colors from "./Colors"




export const constant = {
  SPACING: 14,
  borderRadius: 5,
  titleFontSize: 24,
  textFontSize: 14,
  subTextFontSize: 14,
}




export const drawerMenu = [
  {
    title: "Gallery",
    bg: Colors.menu2,
    transparent:'transparent',
    // bg: 'tramsparent',
    // type: Icons.Feather, 
    icon: 'picture',
    route: 'Gallery',
    menuList: [
      { title: 'Photo Gallery', route:'PhotoGalleryScreen' },
      { title: 'Video Gallery',route:'VideosScreen' },
      { title: 'Temple Photos',route:'MandirPhotosScreen' },
    ]
  },
 
]