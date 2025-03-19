import ProfileLayout from '@/component/profileLayout';

//style
import './layout.scss'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='userProfilPages'>
            <ProfileLayout />
            {children}
        </div>
    )
}
