import BaseLayout from 'components/BaseLayout';
import { getAll } from 'services/conversations/getAll';
import { user } from 'models';
import Link from 'next/link';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { totalCount } from 'services/conversations/totalCount';
import Pagination from 'components/Pagination';

export const getServerSideProps = async ({ req, res, query }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      notFound: true
    };
  }

  const currentUser = await user.findUnique({
    where: {
      email: session.user.email
    }
  });

  const perPage = 7;
  const count = await totalCount({ userId: currentUser.id });
  const pagesCount = Math.ceil(count / perPage);
  const page = Number(query.page || 1);
  const conversations = await getAll({ userId: currentUser.id, perPage, page: page - 1 });
  return {
    props: { conversations, pagesCount, page }
  };
};

export default function Connections({ conversations, pagesCount, page }) {
  return (
    <BaseLayout>
      <div className="border-t-2">
        {conversations.map((item) => {
          return (
            <Link key={`conversation-${item.id}`} href={`/connections/${item.id}`}>
              <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                <div className="w-1/4">
                  {item.users.map(({ user }) => (
                    <img
                      key={user.id}
                      src={user.image}
                      className="inline-block m-0.5 object-cover h-12 w-12 rounded-full"
                      alt=""
                    />
                  ))}
                </div>
                <div className="w-full">
                  <div className="text-lg font-semibold">
                    {item?.messages[item.messages.length - 1]?.user.name}
                  </div>
                  <span className="text-gray-500">
                    {item?.messages[item.messages.length - 1]?.content}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Pagination currentPage={page} href="/connections" pagesCount={pagesCount} />
    </BaseLayout>
  );
}
