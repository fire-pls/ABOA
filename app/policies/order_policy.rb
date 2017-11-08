class OrderPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.admin
        scope.all
      else
        scope.where(user:user)
      end
    end
  end

  def index?
    user.signed_in?
  end

  def show?
    record.user == user || user.admin
  end

  def update?
    record.user == user || user.admin
  end

  def destroy?
    user.admin
  end
end
