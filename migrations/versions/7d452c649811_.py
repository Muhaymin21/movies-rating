"""empty message

Revision ID: 7d452c649811
Revises: 
Create Date: 2021-08-21 13:34:21.331288

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7d452c649811'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('movie',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=30), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('date', sa.String(length=30), nullable=False),
    sa.Column('rate', sa.Integer(), nullable=False),
    sa.Column('img_path', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=30), nullable=False),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.Column('comment', sa.Text(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.Column('movie_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['movie_id'], ['movie.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('rate',
    sa.Column('movie_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.Column('rate', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['movie_id'], ['movie.id'], ),
    sa.PrimaryKeyConstraint('movie_id', 'user_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('rate')
    op.drop_table('comment')
    op.drop_table('movie')
    # ### end Alembic commands ###